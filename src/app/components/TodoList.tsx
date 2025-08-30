'use client';

import { useState, useEffect } from 'react';
import { useContract } from '@/hooks/useContract';

interface TodoList {
  id: string;
  items: string[];
}

export function TodoList() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createNewTodoList, addTodoItem, getTodoLists } = useContract();

  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = async () => {
    setLoading(true);
    try {
      const lists = await getTodoLists();
      setTodoLists(lists);
      if (lists.length > 0 && !selectedList) {
        setSelectedList(lists[0].id);
      }
    } catch (error) {
      console.error('Error loading todo lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async () => {
    setLoading(true);
    try {
      await createNewTodoList();
      await loadTodoLists(); // Recargar las listas
    } catch (error) {
      console.error('Error creating list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!selectedList || !newItem.trim()) return;
    
    setLoading(true);
    try {
      await addTodoItem(selectedList, newItem.trim());
      setNewItem('');
      await loadTodoLists(); // Recargar las listas para ver el nuevo item
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedTodoList = todoLists.find(list => list.id === selectedList);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List en Sui</h1>
        <button 
          onClick={handleCreateList} 
          disabled={loading}
          className="create-list-btn"
        >
          {loading ? 'Creando...' : 'Crear Nueva Lista'}
        </button>
      </div>

      {todoLists.length > 0 && (
        <div className="todo-content">
          <div className="list-selector">
            <h2>Selecciona una lista:</h2>
            <select 
              value={selectedList || ''} 
              onChange={(e) => setSelectedList(e.target.value)}
              className="list-select"
            >
              {todoLists.map(list => (
                <option key={list.id} value={list.id}>
                  Lista {list.id.slice(0, 6)}...
                </option>
              ))}
            </select>
          </div>

          {selectedTodoList && (
            <div className="selected-list">
              <h2>Items:</h2>
              {selectedTodoList.items.length === 0 ? (
                <p>No hay items en esta lista.</p>
              ) : (
                <ul className="todo-items">
                  {selectedTodoList.items.map((item, index) => (
                    <li key={index} className="todo-item">{item}</li>
                  ))}
                </ul>
              )}
              
              <div className="add-item-form">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Nuevo item..."
                  className="item-input"
                  disabled={loading}
                />
                <button 
                  onClick={handleAddItem} 
                  disabled={loading || !newItem.trim()}
                  className="add-item-btn"
                >
                  {loading ? 'Agregando...' : 'Agregar Item'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {todoLists.length === 0 && !loading && (
        <div className="empty-state">
          <p>No tienes ninguna lista. ¡Crea una para comenzar!</p>
        </div>
      )}
    </div>
  );
}