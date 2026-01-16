import { useState, useEffect, useMemo } from 'react';
import { Transaction, FinancialSummary } from '@/types';
import { FinancialService } from '@/services/financial.service';

/**
 * Hook personalizado para manejar datos financieros
 */
export function useFinancial() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar transacciones
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = FinancialService.getTransactions();
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las transacciones');
        console.error('Error loading financial data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Calcular resumen financiero
  const summary = useMemo((): FinancialSummary => {
    return FinancialService.getFinancialSummary();
  }, [transactions]);

  // Obtener transacciones por tipo
  const getTransactionsByType = (type: 'income' | 'expense') => {
    return FinancialService.getTransactionsByType(type);
  };

  // Obtener transacciones por estado
  const getTransactionsByStatus = (status: 'pending' | 'completed' | 'cancelled') => {
    return FinancialService.getTransactionsByStatus(status);
  };

  // Obtener transacciones del mes actual
  const getCurrentMonthTransactions = () => {
    return FinancialService.getCurrentMonthTransactions();
  };

  // Calcular gastos por categoría
  const getExpensesByCategory = () => {
    return FinancialService.getExpensesByCategory();
  };

  // Calcular gasto mensual promedio
  const getAverageMonthlyExpense = () => {
    return FinancialService.getAverageMonthlyExpense();
  };

  // Obtener porcentajes de gastos por categoría
  const getExpensePercentages = () => {
    return FinancialService.getExpenseCategoryPercentages();
  };

  // Agregar nueva transacción
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const validation = FinancialService.validateTransaction(transaction);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const newTransaction: Transaction = {
      ...transaction,
      id: `transaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setTransactions(prev => [...prev, newTransaction]);
    return newTransaction;
  };

  // Actualizar transacción
  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  };

  // Eliminar transacción
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  // Formatear montos
  const formatCurrency = (amount: number) => {
    return FinancialService.formatCurrency(amount);
  };

  // Obtener estadísticas de gastos
  const getExpenseStats = () => {
    const expenses = getTransactionsByType('expense');
    const completedExpenses = expenses.filter(t => t.status === 'completed');

    const totalExpenses = completedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

    const largestExpense = Math.max(...completedExpenses.map(e => e.amount), 0);
    const smallestExpense = Math.min(...completedExpenses.map(e => e.amount), 0);

    return {
      totalExpenses,
      averageExpense,
      largestExpense,
      smallestExpense,
      transactionCount: expenses.length,
      completedCount: completedExpenses.length
    };
  };

  return {
    // Datos
    transactions,
    summary,

    // Estado
    loading,
    error,

    // Métodos de consulta
    getTransactionsByType,
    getTransactionsByStatus,
    getCurrentMonthTransactions,
    getExpensesByCategory,
    getAverageMonthlyExpense,
    getExpensePercentages,

    // Métodos de modificación
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // Utilidades
    formatCurrency,
    getExpenseStats,

    // Refrescar datos
    refreshData: () => {
      setTransactions(FinancialService.getTransactions());
    }
  };
}
