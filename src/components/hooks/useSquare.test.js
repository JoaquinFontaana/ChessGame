import { renderHook, act } from '@testing-library/react-hooks';
import { useContext } from 'react';
import useSquare from './useSquare';
import { BoardContext } from '../BoardContext';

// Mock the BoardContext
jest.mock('../BoardContext', () => ({
  useContext: jest.fn(),
}));

describe('useSquare', () => {
  it('should return the correct values', () => {
    // Mock the values from the BoardContext
    const handlePieceSelect = jest.fn();
    const turn = 'white';
    const selectedPiece = '2-3';
    useContext.mockReturnValue({ handlePieceSelect, turn, selectedPiece });

    // Render the hook
    const { result } = renderHook(() =>
      useSquare('additional-class', 'piece', 'white', 2, 3, 'white')
    );

    // Destructure the returned values
    const { combinedClass, DynamicComponent, availableSquare, onSelect, attackableSquare } = result.current;

    // Assert the values
    expect(combinedClass).toBe('square white additional-class');
    expect(DynamicComponent).toBeNull();
    expect(availableSquare).toBe(false);
    expect(attackableSquare).toBe(false);

    // Call the onSelect function
    act(() => {
      onSelect();
    });

    // Assert that handlePieceSelect was called
    expect(handlePieceSelect).toHaveBeenCalledWith(3, 2);
  });
});