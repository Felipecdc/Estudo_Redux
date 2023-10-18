import { all, takeEvery, call, put, delay } from 'redux-saga/effects'
import { fetchUsersSuccess, fetchUsersFailures } from './slice'
import axios from 'axios'

// https://jsonplaceholder.typicode.com/users/

function* fetchUsers(){
    try{
        yield delay(2000)
        const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users/")
        yield put(fetchUsersSuccess(response.data))
    }catch(err){
        yield put(fetchUsersFailures(err.message))
    }
}

export default all([
    takeEvery("user/fetchUsers", fetchUsers)
])