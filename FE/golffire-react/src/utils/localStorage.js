export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

export const loadStateFromLocalStorage = () => {
    try {
        const dataFOREVER = localStorage.getItem('reduxState');
        console.log("저장된 놈???", dataFOREVER)
        
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined;
    }
};
