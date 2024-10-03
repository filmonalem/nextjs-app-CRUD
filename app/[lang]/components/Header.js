// "use client";
// import { Button } from '@chakra-ui/react';
// import React from 'react';
// import { Layout } from 'antd/es';
// import Title from 'antd/es/typography/Title'; 
// import LanguageSwitcher from './LanguageSwitcher';

// const { Header: AntHeader } = Layout; 

// export default function Header() {
//   return (
//     <AntHeader style={{ backgroundColor: "#009688", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <Title level={3} style={{ color: "#fff", margin: 0 }}>
//         My App
//       </Title>
//       <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
//         <LanguageSwitcher style={{ margin: '0 10px' }} />
//       </div>
//       <Button type="default" style={{ borderColor: "#fff", color: "#fff" }}>
//         Login
//       </Button>
//     </AntHeader>
//   );
// }
"use client";

import { Button } from '@chakra-ui/react';
import React from 'react';
import { Layout } from 'antd/es';
import Title from 'antd/es/typography/Title'; 
import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';

const { Header: AntHeader } = Layout; 

export default function Header() {
  return (
    <AntHeader style={{ backgroundColor: "#009688", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: '0 20px' }}>
      <Title level={3} style={{ color: "#fff", margin: 0 }}>
        My App
      </Title>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <LanguageSwitcher style={{ margin: '0 10px' }} />
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link href="/category" style={{ color: "#fff" }}>Category</Link>
          <Link href="/user" style={{ color: "#fff" }}>User</Link>
        </nav>
      </div>
      <Button type="default" style={{ borderColor: "#fff", color: "#fff" }}>
        Login
      </Button>
    </AntHeader>
  );
}