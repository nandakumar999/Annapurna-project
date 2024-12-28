import React from 'react';
import CountUp from 'react-countup';
import './index.css';

const HomePageCounter = () => {
  const counters = [
    { count: 5, label: 'In Business', suffix: ' years' },
    { count: 30, label: 'Products', suffix: '+' },
    { count: 1000, label: 'Transaction', suffix: '+' },
    { count: 5000, label: 'Clients', suffix: '+' },
  ];

  return (
    <div className="counter-section">
      <h1 className='counter-section_title_09'>From Farm to Your Family, With Love and Care</h1>
      <p className="description">Annapurna Farms is just beginning its journey to deliver the finest agricultural produce. 
        Though new, our commitment to sustainability and purity runs deep, ensuring every product reflects our dedication to nature and authenticity.</p>
      <div className="counter-row">
        {counters.map((item, index) => (
          <div className="counter-col" key={index}>
            <h1>
              <CountUp end={item.count} duration={10} separator="," suffix={item.suffix || ''} />
            </h1>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCounter;
