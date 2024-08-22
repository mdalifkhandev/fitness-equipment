import { Image } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Images = ({ img }: any) => {
  return (
    <div>
      <Image.PreviewGroup
        items={[
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
        ]}
      >
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
