import mongoose, { Document } from 'mongoose';
export interface ISong extends Document {
    title: string;
    artist: string;
    album: string;
    genre: string;
}
declare const _default: mongoose.Model<ISong, {}, {}, {}, mongoose.Document<unknown, {}, ISong, {}, mongoose.DefaultSchemaOptions> & ISong & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISong>;
export default _default;
//# sourceMappingURL=Songs.d.ts.map