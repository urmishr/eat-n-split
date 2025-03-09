import { useState } from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [showAddFriendForm, setAddFriendForm] = useState(false);

    const [friends, setFriends] = useState(initialFriends);

    function handleShowAddFriend() {
        setAddFriendForm((show) => !show);
    }

    function handleAddFriend(friend) {
        setFriends((friends) => [...friends, friend]);
        setAddFriendForm(false);
    }

    return (
        <>
            <Header />
            <div className="app">
                <div className="sidebar">
                    <FriendList friends={friends} />

                    {showAddFriendForm && <FriendAddForm friends={friends} onSetFriend={handleAddFriend} />}
                    <Button onClick={handleShowAddFriend}>{showAddFriendForm ? "Close" : "Add Friend"}</Button>
                </div>
                <FormSplitBill />
            </div>
        </>
    );
}

function Header() {
    return (
        <div className="header">
            <h1 className="title">Eat and Split</h1>
            <p className="tagLine">"Share the Meal, Split the Bill!"</p>
        </div>
    );
}

function FriendList({ friends }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend friend={friend} key={friend.id} />
            ))}
        </ul>
    );
}

function Friend({ friend }) {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 ? (
                <p className="red">
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            ) : friend.balance > 0 ? (
                <p className="green">
                    {friend.name} owes you ${friend.balance}
                </p>
            ) : (
                <p>You and {friend.name} are even.</p>
            )}
            <Button>Select</Button>
        </li>
    );
}

function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

function FriendAddForm({ onSetFriend, friends }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

    function handleAddFriend(e) {
        e.preventDefault();
        if (!name) return;
        const id = crypto.randomUUID();
        const newFriend = { id, name, image: `${image}${id}`, balance: 0 };
        console.log(newFriend);
        onSetFriend(newFriend);
        setName("");
        setImage("https://i.pravatar.cc/48?u=");
    }
    return (
        <>
            <form className="form-add-friend" onSubmit={handleAddFriend}>
                <label>🫱🏼‍🫲🏽 Friend Name: </label>
                <input type="text" placeholder="Name of friend..." value={name} onChange={(e) => setName(e.target.value)}></input>
                <label>🌄 Image URL: </label>
                <input type="text" placeholder="Profile pic URL..." value={image} onChange={(e) => setImage(e.target.value)}></input>
                <Button onClick={handleAddFriend}>Add</Button>
            </form>
        </>
    );
}

function FormSplitBill() {
    return (
        <form className="form-split-bill">
            <h2>Split the bill with the X</h2>
            <label>💵 Bill Value:</label>
            <input type="text" placeholder="$..." />
            <label>🧾 Your Expence:</label>
            <input type="text" placeholder="$..." />
            <label>🧾 X's Expence:</label>
            <input type="text" placeholder="$..." disabled />
            <label>🤑 Who is paying the money?</label>

            <select>
                <option value="you">You</option>
                <option value="X">X</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    );
}
