import { CONTENT_TYPES } from "../modals";
import ViewContentTypeAddress from "./ViewContentTypeAddress";
import ViewContentTypeContactInfo from "./ViewContentTypeContactInfo";
import ViewContentTypeEmail from "./ViewContentTypeEmail";
import ViewContentTypePhone from "./ViewContentTypePhone";
import ViewContentTypeWebsite from "./ViewContentTypeWebsite";
import ViewContentTypeMultipleChoice from "./ViewContentTypeMultipleChoice";
import ViewContentTypeDropdown from "./ViewContentTypeDropdown";
import ViewContentTypeCheckbox from "./ViewContentTypeCheckbox";
import ViewContentTypeImageChoice from "./ViewContentTypeImageChoice";
import ViewContentTypeYesNo from "./ViewContentTypeYesNo";
import ViewContentTypeLongText from "./ViewContentTypeLongText";
import ViewContentTypeShortText from "./ViewContentTypeShortText";
import ViewContentTypeVideoAudio from "./ViewContentTypeVideoAudio";
import ViewContentTypeNumber from "./ViewContentTypeNumber";
import ViewContentTypeDate from "./ViewContentTypeDate";
import ViewContentTypeFileUpload from "./ViewContentTypeFileUpload";
import ViewContentTypeRating from "./ViewContentTypeRating";

export const vistaPreguntas = {
    // Información de contacto
    [CONTENT_TYPES.CONTACT_INFO]: ViewContentTypeContactInfo,
    [CONTENT_TYPES.EMAIL]: ViewContentTypeEmail,
    [CONTENT_TYPES.PHONE]: ViewContentTypePhone,
    [CONTENT_TYPES.ADDRESS]: ViewContentTypeAddress,
    [CONTENT_TYPES.WEBSITE]: ViewContentTypeWebsite,
    
    // Elección
    [CONTENT_TYPES.MULTIPLE_CHOICE]: ViewContentTypeMultipleChoice,
    [CONTENT_TYPES.DROPDOWN]: ViewContentTypeDropdown,
    [CONTENT_TYPES.CHECKBOX]: ViewContentTypeCheckbox,
    [CONTENT_TYPES.IMAGE_CHOICE]: ViewContentTypeImageChoice,
    [CONTENT_TYPES.YES_NO]: ViewContentTypeYesNo,
    
    // Texto y video
    [CONTENT_TYPES.LONG_TEXT]: ViewContentTypeLongText,
    [CONTENT_TYPES.SHORT_TEXT]: ViewContentTypeShortText,
    [CONTENT_TYPES.VIDEO_AUDIO]: ViewContentTypeVideoAudio,
    
    // Otros
    [CONTENT_TYPES.NUMBER]: ViewContentTypeNumber,
    [CONTENT_TYPES.DATE]: ViewContentTypeDate,
    [CONTENT_TYPES.FILE_UPLOAD]: ViewContentTypeFileUpload,
    [CONTENT_TYPES.RATING]: ViewContentTypeRating,
}