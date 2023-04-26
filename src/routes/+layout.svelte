<header>
    <a href="/make">만들기</a>
</header>

<style>
    header {
        width: 100vw;
        height: 50px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
    header > a {
        text-decoration: none;
        color: #000000;
        padding: 10px 30px;
        font-size: 18px;
        font-weight: bold;
    }
</style>

<slot></slot>