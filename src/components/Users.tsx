import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import Loader from "./Loader";

interface userProps {
  handleBalance?: (balance: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Users: React.FC<userProps> = ({ handleBalance, setLoading }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(users);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUsers(response.data.withoutCurrent);
        if (handleBalance) {
          handleBalance(response.data.current.balance);
        }

        setLoading(false);
        console.log("state");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSendMoney = (userId: string, userName: string) => {
    router.push(`/sendMoney?id=${userId}&name=${userName}`);
  };

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={handleFilterChange}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user: any) => (
            <User
              key={user._id}
              user={user}
              handleSendMoney={handleSendMoney}
            />
          ))
        ) : (
          <div className="flex justify-center pt-6">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

interface UserProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  handleSendMoney: (id: string, name: string) => void;
  handleBalance?: () => void;
}

const User: React.FC<UserProps> = ({ user, handleSendMoney }) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => handleSendMoney(user._id, user.firstName)}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};

export default Users;
