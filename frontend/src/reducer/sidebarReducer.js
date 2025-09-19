const sidebarReducer = (state, action) => {
    if(action.type === 'TOGGLE_SIDEBAR'){
        return {...state, isSidebarOpen: !state.isSidebarOpen}
    }
    
    throw new Error(`Нет существующего '${action.type} типа`)
}

export default sidebarReducer