import { Input, QRCode, Space } from 'antd'
import React, { useState } from 'react'

const QrCodeComponent = () => {
    const [text, setText] = useState('https://github.com/Erik-Varga/react-vite-garage-sale-app');

  return (
    <Space direction="vertical" align="center">
      <QRCode value={text || '-'} />
      <Input
        placeholder="-"
        maxLength={360}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Space>
  )
}

export default QrCodeComponent
