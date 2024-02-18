import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import Image from "next/image";

interface BlogProps {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  color: string;
}

const Blog: React.FC<BlogProps> = ({ image, title, subtitle, text, color }) => {
  return (
    <Card>
      <Image alt="Card image cap" src={image} width={500} height={300} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText className="mt-3">{text}</CardText>
        <Button color={color}>Read More</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
