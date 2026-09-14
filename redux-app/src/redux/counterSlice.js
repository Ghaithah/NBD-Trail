
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



export const loadUsers= createAsyncThunk('users/getUsers', async ()=> {
    const response= await fetch('https://jsonplaceholder.typicode.com/users')
    const res= await response.json()
    return res
})


export const counterSlice= createSlice({
    name:'product',
    initialState:{
        productQuantity: 100,
        users:[]
    },
    extraReducers:(builder)=>{
        builder.addCase
        (loadUsers.fulfilled,(state,action) =>{
            state.users= action.payload
            console.log(state.users);
            
        })
    },
    reducers:{

        increment:(state)=>{
            state.productQuantity +=1
        },
        incrementBy2:(state)=>{
            state.productQuantity +=2
        },
          decrement:(state)=>{
            state.productQuantity -=1
        }
    }
})
export const {increment,decrement,incrementBy2}= counterSlice.actions
export default counterSlice.reducer