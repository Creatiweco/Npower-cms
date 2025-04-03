export default ({ env }) => ({
  i18n: {
    config: {
      locales: ['en', 'tr'],
      defaultLocale: 'en',
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      // ↓↓↓ işte bu eksikti
      actionOptions: {
        upload: {},
        delete: {},
      },
      transformAsset(asset) {
        asset.url = `https://res.cloudinary.com/${env("CLOUDINARY_NAME")}/image/upload/${asset.provider_metadata.public_id}`;
        return asset;
      },
    },
  },
});
