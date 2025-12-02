import { route, before, POST } from 'awilix-express';
import { Request, Response } from 'express';
import ResponseTransformer from '../utils/response.transformer';
import { agentUpload } from '../utils/upload';

@route('/uploads')
export default class UploadController {
  private readonly CloudinaryUploader;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ CloudinaryUploader }: any) {
    this.CloudinaryUploader = CloudinaryUploader;
  }

  @POST()
  @route('/agents/images')
  @before([agentUpload.single('image')])
  async create(req: Request, res: Response) {
    const { CloudinaryUploader } = this;

    if (!req.file) return;

    const response = await CloudinaryUploader.uploadFile(req.file.path, {
      folder: `images/agents`,
      overwrite: true,
      public_id: req.file.filename,
      timeout: 600000,
      resource_type: 'image',
    });

    ResponseTransformer.success({ res, data: { url: response.secure_url } });
  }
}
