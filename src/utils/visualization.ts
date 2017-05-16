import { Recording, CachedRecording } from "../types";
import { baseUrl } from "../../config";

export function getRecordingVisualizationUrl(recording: Recording): string {
    return `//${baseUrl}/recordings/${recording.id}/visualize`;
}

export function getCachedVisualizationUrl(cached: CachedRecording): string {
    return `//${baseUrl}/recordings/cached/${cached.id}/visualize`;
}

