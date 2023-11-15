import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { prettyDate } from "@/lib/date";

function AdminsPage() {
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(ev) {
    ev.preventDefault();
    axios.post('/api/admins', { email })
      .then(res => {
        console.log(res.data);
        alert('Admin created!');
        setEmail('');
        loadAdmins();
      })
      .catch(err => {
        alert(`Error!\n${err.response.data.message}`);
      });
  }

  function deleteAdmin(_id, email) {
    const confirmDelete = window.confirm(`Do you want to delete admin ${email}?`);

    if (confirmDelete) {
      axios.delete('/api/admins?_id=' + _id)
        .then(() => {
          alert('Admin deleted!');
          loadAdmins();
        });
    }
  }

  function loadAdmins() {
    setIsLoading(true);
    axios.get('/api/admins')
      .then(res => {
        setAdminEmails(res.data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            className="mb-0"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            placeholder="google email" />
          <button
            type="submit"
            className="btn-primary py-1 whitespace-nowrap">
            Add admin
          </button>
        </div>
      </form>

      <h2>Existing admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Admin google email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {adminEmails.length > 0 && adminEmails.map(adminEmail => (
            <tr key={adminEmail._id}>
              <td>{adminEmail.email}</td>
              <td>
                {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
              </td>
              <td>
                <button
                  onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)}
                  className="btn-red">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default AdminsPage;
