import type { Request, Response } from 'express';
export declare const getAllSongs: (req: Request, res: Response) => Promise<void>;
export declare const createSong: (req: Request, res: Response) => Promise<void>;
export declare const updateSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSong: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=songController.d.ts.map