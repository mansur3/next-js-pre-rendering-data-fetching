import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setData] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(
    "https://next-js-project-9e98c-default-rtdb.firebaseio.com/sales.json"
  );
  //   useEffect(() => {
  //     setIsLoading(true);
  //   fetch(
  //     "https://next-js-project-9e98c-default-rtdb.firebaseio.com/sales.json"
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setIsLoading(false);

  // setData(transformedSales);
  //     });
  //   }, []);
  console.log(sales, data);

  useEffect(() => {
    if (data) {
      console.log(data);
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setData(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>...loading</p>;
  }
  //   if (sales.length === 0 || !data) {
  //     return <p>...no data yet</p>;
  //   }
  return (
    <ul>
      {sales &&
        sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume}
          </li>
        ))}
    </ul>
  );
}

export async function getStatisProps(context) {
  const res = await fetch(
    "https://next-js-project-9e98c-default-rtdb.firebaseio.com/sales.json"
  );

  const data = res.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
