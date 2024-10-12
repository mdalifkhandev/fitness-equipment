import { Image } from 'antd';
import Loding from './Loding';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Images = ({ img }: any) => {
  // Check if the img object exists and has at least one valid image
  const imageList = [
    img?.img1,
    img?.img2,
    img?.img3,
    img?.img4,
    img?.img5,
    img?.img6,
    img?.img7,
    img?.img8,
    img?.img9,
    img?.img10,
    img?.img11,
    img?.img12,
    img?.img13,
    img?.img14,
    img?.img15,
  ].filter(Boolean); // This will remove undefined or null values

  // If there are no images, return a loading or error component
  if (!imageList.length) {
    return <Loding />;
  }

  return (
    <div>
      <Image.PreviewGroup items={imageList.map(src => ({ src }))}>
        <Image
          className="overflow-hidden relative block"
          width={500}
          src={img?.img1}
        />
      </Image.PreviewGroup>
    </div>
  );
};

export default Images;
