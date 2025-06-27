import { logout } from "../../api/auth";

function Header() {
    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            console.error({ error })
            alert(error.message);
        }
    };

    return (
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <h1>My Blog</h1>
            <button onClick={handleLogout}>로그아웃</button>
        </header>
    )
}

export default Header;