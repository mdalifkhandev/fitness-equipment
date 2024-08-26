import about from '@/assets/New folder/about/Mighty_Fitness.webp';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const About = () => {
  return (
    <div className="">
      {/* company */}
      <div>
        <h1 className=" text-center text-5xl m-8">About Company</h1>
        <h1 className="text-3xl m-8">
          Mighty Fitness is a fitness brand specializing in home gym equipment.
          It is our goal to motivate you and provide you with the means to get
          healthy and Mighty Fit.
        </h1>
        <h2 className=" text-3xl m-8">
          We are determined to get Mighty Gyms into homes all across North
          America.{' '}
        </h2>
        <p className=" text-xl m-8">
          Mighty Fitness emerged out of necessity in 2020. With gyms being
          inaccessible to all, we recognized the importance of staying fit in
          the comfort of our home. We like to stay active and wanted to provide
          our community with the same opportunity.
        </p>
        <p className=" text-xl m-8">
          Fast forward to 2022, we now have access to both public and homegyms -
          a hybrid approach. Having a homegym leaves little room for excuses and
          will motivate you to move and work! A constant reminder is what we
          need. A constant reminder to remember what's important: our health. It
          is our greatest wealth. Let us help transform your garage, office,
          basement, bedroom or even your backyard into a Migthy Den.
        </p>
        <p className=" text-xl m-8">
          We have created our products with great detail and aesthetic -
          unbeatable prices as well top-notch quality. We carry all the
          essentials you will need to create your dream gym.{' '}
        </p>
        <h3 className=" text-2xl m-8">Stay Mighty Fit in your home. :</h3>
        <img src={about} alt="" />
      </div>
      {/* Team Introduction */}
      <div>
        <h1 className=" text-center text-5xl m-8">About Our Time</h1>
        <div className="flex justify-center gap-8">
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
