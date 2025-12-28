import { getIcon } from '../util/weather';
import Button from './Button';
import WeatherForm from './WeatherForm';

interface Props {
  data: {
    city: string;
    minTemp: number;
    maxTemp: number;
    icon: string;
    desc: string;
    ignore?: boolean;
  }[];
}

const WeatherDetail: React.FC<Props> = ({ data }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const region = searchParams.get('region');
  const regionData = data.find(
    (item) => item.city.toLowerCase() === region?.toLowerCase()
  );

  if (!regionData) {
    return (
      <>
        <p className="text-xl text-gray-700 mb-4">
          kan geen weer vinde voor {region}, voeg je plaats hieronder toe
        </p>
        <WeatherForm />
      </>
    );
  }

  if (regionData.ignore) {
    return (
      <>
        <p className="text-xl text-gray-700 mb-4">
          {regionData.city} is vernietegt 💥 je kan {regionData.city} hieronder
          weer toevoege
        </p>
        <WeatherForm />
      </>
    );
  }

  const icon = getIcon(regionData.icon);
  const desc = icon + ' ' + regionData.desc + ' ' + icon;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        het weerberigt van {region}: {icon}
      </h2>
      <p className="text-xl text-gray-700 mb-4">
        het wort minenmaal {regionData.minTemp} geraden
      </p>
      <p className="text-xl text-gray-700 mb-8">
        en het wort maxenmaal {regionData.maxTemp} geraden
      </p>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        kun je paart reide? {icon}
      </h2>
      <p
        className="text-xl text-gray-700 mb-8"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        andere plaats zoeke?
      </h2>
      <p className="text-xl text-gray-700 mb-4">
        klik op de link om al het weer te bekeike
      </p>
      <Button text="bekeik alle plaatse" href="/weer" />
    </div>
  );
};

export default WeatherDetail;
