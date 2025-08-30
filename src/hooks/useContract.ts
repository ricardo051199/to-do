'use client';

import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, NETWORKS } from '@/lib/suiClient';

export const useContract = () => {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();

  const createNewTodoList = async () => {
    try {
        const tx = new TransactionBlock() as any;
      
        tx.moveCall({
            target: `${NETWORKS.testnet.PACKAGE_ID}::todo::new`,
            arguments: [],
        });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
        },
      });

      console.log('TodoList creada:', result);
      return result;
    } catch (error) {
      console.error('Error creando TodoList:', error);
      throw error;
    }
  };

  const addTodoItem = async (listId: string, item: string) => {
    try {
      const tx = new TransactionBlock();
      
      tx.moveCall({
        target: `${NETWORKS.testnet.PACKAGE_ID}::todo::add`,
        arguments: [
          tx.object(listId),
          tx.pure.string(item),
        ],
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
        },
      });

      console.log('Item agregado:', result);
      return result;
    } catch (error) {
      console.error('Error agregando item:', error);
      throw error;
    }
  };

  const getTodoLists = async () => {
    if (!currentAccount?.address) return [];
    
    try {
      const { data } = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${NETWORKS.testnet.PACKAGE_ID}::todo::TodoList`,
        },
        options: {
          showContent: true,
        },
      });

      return data.map((item: any) => ({
        id: item.data.objectId,
        items: item.data.content.fields.items,
      }));
    } catch (error) {
      console.error('Error obteniendo TodoLists:', error);
      return [];
    }
  };

  return { createNewTodoList, addTodoItem, getTodoLists };
};
