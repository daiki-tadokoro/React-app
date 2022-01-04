// 全ユーザー一覧を取得するカスタムフック
import { userProfile } from "../types/userProfile"
import axios from "axios"
import { User } from "../types/api/users"
import { useState } from 'react';

export const useAllUsers = () => {
    const [userProfile, setUserProfile ] = useState<Array<userProfile>>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getUsers = () => {
        setLoading(true);
        setError(false);

        axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users").then((res) => {
            const data = res.data.map((user) => ({
                id: user.id,
                name: `${user.name}(${user.username})`,
                email: user.email,
                address: `${user.address.city}${user.address.suite}${user.address.street}`
            }));
            setUserProfile(data);
        }).catch((err) =>{
            console.log(err);
            setError(true);
        }).finally(() => {
            setLoading(false)
        })
    }
    // 返却値はオブジェクトか配列
    return { getUsers, userProfile, loading, error };
}