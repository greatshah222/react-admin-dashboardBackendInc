import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const Product = ({
  _id,
  name,
  description,
  price,
  category,
  rating,
  supply,
  stat,
}) => {
  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {name}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: "1.5rem",
          }}
          color={theme.palette.secondary[400]}
        >
          €{Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Details" : " See More"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography variant="body2">id: {_id}</Typography>
          <Typography variant="body2">Supply Left: {supply}</Typography>
          <Typography variant="body2">
            Yearly Sales This year : {stat.yearlySalesTotal}
          </Typography>
          <Typography variant="body2">
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
