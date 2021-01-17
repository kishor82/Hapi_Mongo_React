import cloudinary from 'cloudinary';

const uploadFile = async (file: any, config: any) => {
  const { cloud_name, api_key, api_secret } = config.cloudinary;
  cloudinary.v2.config({
    cloud_name,
    api_key,
    api_secret,
  });
  try {
    const result = await cloudinary.v2.uploader.upload(file.path);
    return result;
  } catch (err) {
    throw err;
  }
};

export default uploadFile;
