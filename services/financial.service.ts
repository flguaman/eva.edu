import { Transaction, FinancialSummary, TransactionType, TransactionStatus, TransactionCategory } from '@/types';
import { representativeData } from '@/lib/representative-data';

/**
 * Servicio para manejar operaciones financieras
 */
export class FinancialService {
  /**
   * Obtiene todas las transacciones
   */
  static getTransactions(): Transaction[] {
    return representativeData.transactions as Transaction[];
  }

  /**
   * Obtiene transacciones por tipo
   */
  static getTransactionsByType(type: TransactionType): Transaction[] {
    return this.getTransactions().filter(transaction => transaction.type === type);
  }

  /**
   * Obtiene transacciones por estado
   */
  static getTransactionsByStatus(status: TransactionStatus): Transaction[] {
    return this.getTransactions().filter(transaction => transaction.status === status);
  }

  /**
   * Obtiene transacciones por categoría
   */
  static getTransactionsByCategory(category: TransactionCategory): Transaction[] {
    return this.getTransactions().filter(transaction => transaction.category === category);
  }

  /**
   * Calcula el resumen financiero
   */
  static getFinancialSummary(): FinancialSummary {
    const transactions = this.getTransactions();

    const completedTransactions = transactions.filter(t => t.status === 'completed');

    const totalIncome = completedTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = completedTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      pendingTransactions
    };
  }

  /**
   * Obtiene transacciones del mes actual
   */
  static getCurrentMonthTransactions(): Transaction[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return this.getTransactions().filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth &&
             transactionDate.getFullYear() === currentYear;
    });
  }

  /**
   * Calcula gastos por categoría
   */
  static getExpensesByCategory(): Record<TransactionCategory, number> {
    const expenses = this.getTransactionsByType('expense')
      .filter(t => t.status === 'completed');

    const categoryTotals: Record<string, number> = {};

    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return categoryTotals as Record<TransactionCategory, number>;
  }

  /**
   * Obtiene el gasto mensual promedio
   */
  static getAverageMonthlyExpense(): number {
    const expenses = this.getTransactionsByType('expense')
      .filter(t => t.status === 'completed');

    if (expenses.length === 0) return 0;

    // Agrupar por mes
    const monthlyTotals: Record<string, number> = {};

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + expense.amount;
    });

    const totalMonths = Object.keys(monthlyTotals).length;
    const totalExpenses = Object.values(monthlyTotals).reduce((sum, amount) => sum + amount, 0);

    return totalMonths > 0 ? Math.round((totalExpenses / totalMonths) * 100) / 100 : 0;
  }

  /**
   * Formatea montos a moneda
   */
  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Calcula el porcentaje de gastos por categoría
   */
  static getExpenseCategoryPercentages(): Array<{ category: TransactionCategory; percentage: number; amount: number }> {
    const categoryTotals = this.getExpensesByCategory();
    const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category: category as TransactionCategory,
      amount,
      percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);
  }

  /**
   * Valida una transacción
   */
  static validateTransaction(transaction: Partial<Transaction>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!transaction.amount || transaction.amount <= 0) {
      errors.push('El monto debe ser mayor a 0');
    }

    if (!transaction.description || transaction.description.trim().length === 0) {
      errors.push('La descripción es requerida');
    }

    if (!transaction.category) {
      errors.push('La categoría es requerida');
    }

    if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
      errors.push('El tipo debe ser ingreso o gasto');
    }

    if (!transaction.date) {
      errors.push('La fecha es requerida');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
