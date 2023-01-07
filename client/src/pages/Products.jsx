import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import Product from "../components/Product";
import { useGetProductsQuery } from "../state/api";

const Products = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  console.log(
    "🚀 ~ file: Products.jsx:19 ~ Products ~ data, isLoading",
    data,
    isLoading
  );

  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subTitle="See your list of products" />

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
          justifyContent="space-between"
          rowGap={"20px"}
          columnGap="1.33%"
          sx={{
            "& >div": {
              // span 4 means it will take entire width
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map((el) => (
            <Product
              key={el._id}
              _id={el._id}
              name={el.name}
              description={el.description}
              price={el.price}
              category={el.category}
              rating={el.rating}
              supply={el.supply}
              stat={el.stat[0]}
            />
          ))}
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flex={1}
        >
          <Header subTitle={"Loading..."} />
        </Box>
      )}
    </Box>
  );
};

export default Products;
