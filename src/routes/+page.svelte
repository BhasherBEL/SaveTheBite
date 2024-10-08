<script>
  // You can add any necessary JavaScript logic here
</script>

<svelte:head>
  <title>SaveTheBite</title>
  <meta name="description" content="SaveTheBite - Every bite matters!" />
</svelte:head>

<!-- HTML structure -->
<header>
    <div class="logo">
        <img src="/static/images/logo.jpg" alt="Save The Bite Logo" />
    </div>
    <nav>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/account">Account</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>

    <!-- Icons section -->
    <div class="icon-links">
        <div class="icon-item">
            <a href="/">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
        </div>
        <div class="icon-item">
            <a href="/about">
                <i class="fas fa-info-circle"></i>
                <span>About</span>
            </a>
        </div>
        <div class="icon-item">
            <a href="/account">
                <i class="fas fa-user"></i>
                <span>Account</span>
            </a>
        </div>
    </div>
</header>

<main>
    <!-- Example of the main section content -->
    <div class="search-section">
        <h1>Every bite matters!</h1>
        <div class="search-bar">
            <input type="text" placeholder="City, region, address..." />
            <button class="search-btn">Search</button>
        </div>
    </div>
    <div class="filters">
        <button class="filter-btn">Vegetarian</button>
        <button class="filter-btn">Vegan</button>
        <button class="filter-btn">Fish</button>
        <!-- Add more filters as needed -->
    </div>

    <div class="content-section">
        <div class="product-list">
            <!-- Product cards here -->
            <div class="product-card">
                <img src="/static/images/veggies.jpg" alt="Veggie batch">
                <h3>Veggie batch</h3>
                <p>5€</p>
            </div>
            <div class="product-card">
                <img src="/static/images/bread.jpg" alt="Bread">
                <h3>Bread</h3>
                <p>5€</p>
            </div>
            <!-- Add more product cards as needed -->
        </div>

        <div class="map-section">
            <!-- Map or map image -->
            <img src="/static/images/map.png" alt="Map showing store locations" />
        </div>
    </div>
</main>

<footer>
    <p>&copy; 2024 SaveTheBite. All rights reserved.</p>
</footer>

<!-- CSS section -->
<style>
  /* Global styles */
  body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
  }

  header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      background-color: white;
      border-bottom: 1px solid #ddd;
  }

  .logo img {
      height: 50px;
      width: auto;
  }

  nav {
      flex-grow: 1;
  }

  .nav-links {
      list-style: none;
      display: flex;
      gap: 20px;
  }

  .nav-links li {
      padding: 10px;
  }

  .nav-links a {
      text-decoration: none;
      color: #333;
      transition: color 0.3s ease;
  }

  .nav-links a:hover {
      color: #5cb85c;
  }

  .icon-links {
      display: flex;
      gap: 20px;
      align-items: center;
  }

  .icon-item {
      text-align: center;
  }

  .icon-item a {
      text-decoration: none;
      color: #333;
      transition: color 0.3s ease;
  }

  .icon-item a:hover {
      color: #5cb85c;
  }

  .icon-item i {
      font-size: 24px;
      display: block;
      margin-bottom: 5px;
  }

  main {
      padding: 20px;
  }

  .search-section {
      text-align: center;
      margin-bottom: 20px;
  }

  .search-bar {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      width: 100%;
  }

  .search-bar input {
      width: 300px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
  }

  .search-btn {
      background-color: #5cb85c;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  .filters {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .filter-btn {
      margin: 0 5px;
      padding: 10px 15px;
      background-color: #eee;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  .filter-btn:hover {
      background-color: #ddd;
  }

  .content-section {
      display: flex;
      gap: 20px;
  }

  .product-list {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
  }

  .product-card {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      text-align: center;
  }

  .product-card img {
      width: 100%;
      height: auto;
  }

  .map-section {
      flex: 1;
  }

  .map-section img {
      width: 100%;
      height: auto;
  }

  footer {
      text-align: center;
      padding: 20px;
      background-color: white;
      border-top: 1px solid #ddd;
  }
</style>
