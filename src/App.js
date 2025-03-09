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
    return (
        <>
            <Header />
            <div className="app">
                <div className="sidebar">
                    <FriendList />
                    <FriendAddForm />
                    <Button>Add Friend</Button>
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

function FriendList() {
    const friends = initialFriends;
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

function Button({ children }) {
    return <button className="button">{children}</button>;
}

function FriendAddForm() {
    return (
        <>
            <form className="form-add-friend">
                <label>🫱🏼‍🫲🏽 Friend Name: </label>
                <input type="text" placeholder="Name of friend..."></input>
                <label>🌄 Image URL: </label>
                <input type="text" placeholder="Profile pic URL..."></input>
                <Button>Submit</Button>
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
