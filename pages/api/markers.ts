// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Marker } from "../../src/shared/types";
import markers from "./__mocks__/markers.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Marker[]>
) {
  res.status(200).json(markers);
}
