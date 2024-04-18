import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import style from './UploadDocs.module.scss'


const UploadDocs = () => {
   const [fileList, setFileList] = useState([]);
   const [uploading, setUploading] = useState(false);

   const handleUpload = () => {
      const formData = new FormData();
      fileList.forEach((file) => {
         formData.append('files[]', file);
      });
      setUploading(true);
      // You can use any AJAX library you like
      fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
         method: 'POST',
         body: formData,
      })
         .then((res) => res.json())
         .then(() => {
            setFileList([]);
            message.success('Файлы успешно загружены');
         })
         .catch(() => {
            message.error('Ошибка загрузки');
         })
         .finally(() => {
            setUploading(false);
         });
   };

   const props = {
      onRemove: (file) => {
         const index = fileList.indexOf(file);
         const newFileList = fileList.slice();
         newFileList.splice(index, 1);
         setFileList(newFileList);
      },
      beforeUpload: (file) => {
         setFileList([...fileList, file]);

         return false;
      },
      fileList,
   };

   return (
      <div className={style.wrapper}>
         <Upload {...props}>
            <Button  
            icon={<UploadOutlined />}>Выберите файл</Button>
         </Upload>
         <Button
            type="primary"
            onClick={handleUpload}
            // disabled={fileList.length === 0}
            loading={uploading}
            className={style.btn}
            style={{ marginTop: 16, backgroundColor:'#cda05f',fontWeight:'600' }}
         >
            {uploading ? 'Загружается...' : 'Загрузить'}
         </Button>
      </div>
   );
};

export default UploadDocs;