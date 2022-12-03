import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;
  // console.log(products);
  return (
    <div>
      <ul>
        {products.map((e) => {
          return (
            <li key={e.id}>
              <Link href={`/products/${e.id}`}>{e.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backened.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // console.log(data);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
