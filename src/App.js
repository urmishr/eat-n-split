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
    const [showAddFriendForm, setShowAddFriendForm] = useState(false);

    const [friends, setFriends] = useState(initialFriends);

    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriend() {
        setShowAddFriendForm((show) => !show);
    }

    function handleAddFriend(friend) {
        setFriends((friends) => [...friends, friend]);
        setShowAddFriendForm(false);
    }

    function handleSelectedFriend(friend) {
        // setSelectedFriend(friend);

        setSelectedFriend((selected) => (selected?.id === friend.id ? null : friend));
        setShowAddFriendForm(false);
    }

    function handleSplitBill(balance) {
        console.log(balance);
        setFriends(friends.map((friend) => (friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + balance } : { ...friend })));
    }

    return (
        <>
            <Header />
            <div className="app">
                <div className="sidebar">
                    <FriendList friends={friends} onHandleSelectedFriend={handleSelectedFriend} selectedFriend={selectedFriend} />

                    {showAddFriendForm && <FriendAddForm friends={friends} onSetFriend={handleAddFriend} />}
                    <Button onClick={handleShowAddFriend}>{showAddFriendForm ? "Close" : "Add Friend"}</Button>
                </div>
                {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
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

function FriendList({ friends, onHandleSelectedFriend, selectedFriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend friend={friend} key={friend.id} onHandleSelectedFriend={onHandleSelectedFriend} selectedFriend={selectedFriend} />
            ))}
        </ul>
    );
}

function Friend({ friend, onHandleSelectedFriend, selectedFriend }) {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? "selected" : ""}>
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
            <Button onClick={() => onHandleSelectedFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
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

function FriendAddForm({ onSetFriend }) {
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("");
    const [expence, setExpence] = useState("");
    const paidByFriend = bill ? bill - expence : "";
    const [paidBy, setPaidBy] = useState("You");

    function handleSubmitForm(e) {
        e.preventDefault();
        if (!bill || !expence) return;
        onSplitBill(paidBy === "You" ? paidByFriend : -expence);
    }

    return (
        <>
            <form className="form-split-bill" onSubmit={handleSubmitForm}>
                <h2>Split the bill with the {selectedFriend.name}</h2>
                <label>💵 Bill Value:</label>
                <input type="text" placeholder="$..." value={bill} onChange={(e) => setBill(Number(e.target.value))} />
                <label>🧾 Your Expence:</label>
                <input type="text" placeholder="$..." value={expence} onChange={(e) => setExpence(Number(e.target.value) > bill ? expence : Number(e.target.value))} />
                <label>🧾 {selectedFriend.name}'s Expence:</label>
                <input type="text" placeholder="$..." disabled value={paidByFriend} />
                <label>🤑 Who is paying the money?</label>

                <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
                    <option value="You">You</option>
                    <option value={selectedFriend.name}>{selectedFriend.name}</option>
                </select>
                <Button>Split Bill</Button>
            </form>
        </>
    );
}
