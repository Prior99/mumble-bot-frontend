import { Recording } from "../types";
import { baseUrl } from "../../config";

export function getVisualizationUrl(recording: Recording): string {
    return `${baseUrl}/recordings/${recording.id}/visualize`;
}
