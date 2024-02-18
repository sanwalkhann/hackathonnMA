import { Card, CardBody } from "reactstrap";

interface TopCardsProps {
  bg: string;
  icon: string;
  earning: string;
  subtitle: string;
  title: string;
}

const TopCards: React.FC<TopCardsProps> = ({ bg, icon, earning, subtitle }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className={`circle-box lg-box d-inline-block ${bg}`}>
            <i className={icon} />
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-weight-bold">{earning}</h3>
            <small className="text-muted">{subtitle}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
