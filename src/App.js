import React, { useEffect, useState } from "react";
import api from "./api";

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =========================
  // READ（一覧取得）
  // =========================
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // CREATE（新規作成）
  // =========================
  const createUser = async () => {
    try {
      await api.post("/users", { name, email });
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("作成エラー:", error);
    }
  };

  // =========================
  // UPDATE（更新）
  // =========================
  const updateUser = async () => {
    try {
      await api.put(`/users/${editingId}`, { name, email });
      setEditingId(null);
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  // =========================
  // DELETE（削除）
  // =========================
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  // 編集ボタン押下時
  const startEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div>
      <h1>ユーザー管理</h1>

      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="メール"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editingId ? (
        <button onClick={updateUser}>更新</button>
      ) : (
        <button onClick={createUser}>作成</button>
      )}

      <hr />

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => startEdit(user)}>編集</button>
            <button onClick={() => deleteUser(user.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;