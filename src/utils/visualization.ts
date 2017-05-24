import { Recording, CachedRecording } from "../types";

declare var baseUrl: string;

export function getRecordingVisualizationUrl(recording: Recording): string {
    return `//${baseUrl}/recordings/${recording.id}/visualize`;
}

export function getCachedVisualizationUrl(cached: CachedRecording): string {
    return `//${baseUrl}/recordings/cached/${cached.id}/visualize`;
}
