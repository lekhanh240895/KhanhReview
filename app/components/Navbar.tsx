import { getPopularPosts } from "../lib/getData";
import BasicMenu from "./BasicMenu";
import ClientSiteRoute from "./ClientSiteRoute";

async function Navbar() {
  const posts: Post[] = await getPopularPosts();

  const categories: Category[] = Array.from(
    new Set(posts.map((post) => post.category.title))
  ).map(
    (title) => posts.find((post) => post.category.title === title)!.category
  );

  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-xl pt-4">
      <ClientSiteRoute route="/" className="px-1 md:px-2 hover:text-primary">
        Home
      </ClientSiteRoute>

      <ClientSiteRoute
        route="/products"
        className="px-1 md:px-2 hover:text-primary"
      >
        Products
      </ClientSiteRoute>

      {posts.length > 0 && (
        <BasicMenu items={posts.slice(0, 4)} rotateIconDown>
          <span className="group-hover:text-primary transition-all">
            Top Posts
          </span>
        </BasicMenu>
      )}

      {categories.length > 0 && (
        <BasicMenu items={categories} rotateIconDown itemPreHref="category">
          <span className="group-hover:text-primary transition-all">
            Categories
          </span>
        </BasicMenu>
      )}

      <ClientSiteRoute
        route="/contact"
        className="px-1 md:px-2 hover:text-primary"
      >
        Contact
      </ClientSiteRoute>
    </nav>
  );
}

export default Navbar;
