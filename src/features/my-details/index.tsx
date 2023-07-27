import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Navbar from '../../components/nav-bar';
import ServiceModal from '../../components/service-modal';
import { ServiceInfo, serviceInfo } from '../../config/services';
import BackgroundImage from '../../components/background';
import Footer from '../../components/footer';
import { Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import MyDis from '../../assets/Discharge.png';
import MyIns from '../../assets/Insurance-Status-icon.png';
import MyBill from '../../assets/myBill.png';
import './index.css';

interface Services {
  title: string;
  icon: string;
  path: string;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

function MyDetails() {
  const [myDetailsModules, setMyDetailsModules] = useState([
    {
      title: 'My Bill',
      icon: MyBill,
      path: '/mybills',
    },
    {
      title: 'My Discharge',
      icon: MyDis,
      path: '/mydischarge',
    },
    {
      title: 'Insurance Status',
      icon: MyIns,
      path: '/myinsurance',
    },
  ]);

  const patientTypeCheck = () => {
    const patient_type = localStorage.getItem('patient_type');
    if (patient_type === 'GENERAL') {
      setMyDetailsModules([
        {
          title: 'My Bill',
          icon: MyBill,
          path: '/mybills',
        },
        {
          title: 'My Discharge',
          icon: MyDis,
          path: '/mydischarge',
        },
      ]);
    } else {
      setMyDetailsModules([
        {
          title: 'My Bill',
          icon: MyBill,
          path: '/mybills',
        },
        {
          title: 'My Discharge',
          icon: MyDis,

          path: '/mydischarge',
        },
        {
          title: 'Insurance Status',
          icon: MyIns,
          path: '/myinsurance',
        },
      ]);
    }
  };

  useEffect(() => {
    patientTypeCheck();
  }, []);

  const naviage = useNavigate();
  const { t } = useTranslation(['mydetails']);

  const onClick = useCallback((title: string, path: string) => {
    const findService = serviceInfo.find((service) => service.title === title);
    if (!findService) {
      naviage(path);
    }
  }, []);

  const Back = () => {
    naviage('/services');
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5%' }}>
        <div
          onClick={Back}
          style={{ marginBottom: '10%', marginRight: '100%' }}
        >
          <Icon disabled name="arrow left" size="large" />{' '}
          {/* color="#6D6D70" */}
        </div>

        <Grid columns={2} rows={3} padded>
          {myDetailsModules.map((item, index, path) => (
            <Grid.Column
              key={`col-${index}`}
              onClick={() => onClick(item.title, item.path)}
              className="grid-item"
              style={{
                marginLeft: '6%',
                background: '#4A98CD',
                width: '40%',
                height: '95px',
                borderRadius: '25px',
              }}
            >
              <img src={item.icon} width={50} height={50} />
              <div>
                <h1
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'white',
                    paddingBottom: 20,
                  }}
                >
                  {t(item.title)}
                </h1>
              </div>
            </Grid.Column>
          ))}
        </Grid>
        <BackgroundImage />
        <Footer />
      </div>
    </>
  );
}

export default MyDetails;
