import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { product } = props;
  if (!product) {
    return <div>...Loading</div>;
  }
  return (
    <Fragment>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backened.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  console.log(productId);
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }
  if (product.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));
  return {
    // paths: [
    //   {
    //     params: { pid: "p1" },
    //   },
    // ],
    paths: params,
    fallback: true,
    // fallback: "blocking",
  };
}

export default ProductDetailPage;
