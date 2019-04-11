import { read } from "fs";

export interface Icredentials {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}
export interface Itoken {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  expire_date_time?: number;
}

export interface IrefreshToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface Iperson {
  resourceName?: string;
  etag?: string;
  metadata?: PersonMetadata;
  locales?: Locale[];
  names?: Name[];
  nicknames?: Nickname[];
  readonly coverPhotos?: CoverPhoto[];
  readonly photos?: Photo[];
  genders?: Gender[];
  readonly ageRange?: AgeRange;
  readonly ageRanges?: AgeRangeType[];
  birthdays?: Birthday[];
  events?: Event[];
  addresses?: Address[];
  residences?: Residence[];
  emailAddresses?: EmailAddress[];
  phoneNumbers?: PhoneNumber[];
  imClients?: ImClient[];
  readonly taglines?: Tagline[];
  biographies?: Biography[];
  urls?: Url[];
  organizations?: Organization[];
  occupations?: Occupation[];
  interests?: Interest[];
  skills?: Skill[];
  braggingRights?: BraggingRights[];
  relations?: Relation[];
  readonly relationshipInterests?: RelationshipInterest[];
  readonly relationshipStatuses?: RelationshipStatus[];
  readonly memberships?: Membership[];
  userDefined?: UserDefined;
  sipAddresses?: SipAddress[];
}

interface PersonMetadata {
  sources?: Source[];
  previousResourceNames?: string[];
  linkedPeopleResourceNames?: string[];
  deleted?: boolean;
  objectType?: ObjectType;
}

interface Locale {
  metadata?: FieldMetadata;
  value: string;
}

interface FieldMetadata {
  primary: boolean;
  verified: boolean;
  source: Source;
}

interface Source {
  type: SourceType;
  id: string;
  etag?: string;
  updateTime?: string;
  profilemetadata?: ProfileMetadata;
}

interface ProfileMetadata {
  objectType: ObjectType;
  userTypes: UserType[];
}

interface Name {
  metadata?: FieldMetadata;
  displayName?: string;
  displayNameLastFirst?: string;
  familyName?: string;
  givenName?: string;
  middleName?: string;
  honorificPrefix?: string;
  honorificSuffix?: string;
  phoneticFullName?: string;
  phoneticFamilyName?: string;
  phoneticGivenName?: string;
  phoneticMiddleName?: string;
  phoneticHonorificPrefix?: string;
  phoneticHonorificSuffix?: string;
}

interface Nickname {
  metadata?: FieldMetadata;
  value: string;
  type: NicknameType;
}

interface CoverPhoto {
  metadata?: FieldMetadata;
  url?: string;
  default?: boolean;
}

interface Photo {
  metadata?: FieldMetadata;
  url?: string;
  default?: boolean;
}

interface Gender {
  metadata?: FieldMetadata;
  value: string;
  formattedValue?: string;
}

interface AgeRangeType {
  metadata?: FieldMetadata;
  ageRange: AgeRange;
}

interface Birthday {
  metadata?: FieldMetadata;
  date: DateContact;
  text?: string;
}
interface DateContact {
  year: number;
  month: number;
  day: number;
}

interface Event {
  metadata?: FieldMetadata;
  date: DateContact;
  type: string;
  readonly formattedType?: string;
}

interface Address {
  metadata?: FieldMetadata;
  formattedValue?: string;
  type?: string;
  readonly formattedType?: string;
  poBox?: string;
  streetAddress?: string;
  extendedAddress?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  countryCode?: string;
}

interface Residence {
  metadata?: FieldMetadata;
  value: string;
  current: boolean;
}

interface EmailAddress {
  metadata?: FieldMetadata;
  value: string;
  type: string; // work, home, other
  readonly formattedType?: string;
  displayName?: string;
}

interface PhoneNumber {
  metadata?: FieldMetadata;
  value: string;
  canonicalForm?: string;
  type: string;
  readonly formattedType?: string;
}

interface ImClient {
  metadata?: FieldMetadata;
  username: string;
  type: string;
  readonly formattedType?: string;
  protocol: string;
  formattedProtocol: string;
}

interface Tagline {
  metadata?: FieldMetadata;
  value: string;
}

interface Biography {
  metadata?: FieldMetadata;
  value: string;
  contentType: ContentType;
}

interface Url {
  metadata?: FieldMetadata;
  value: string;
  type: string; // home,work,blog,profile,homepage,ftp,resevation,appInstallpage,other
  readonly formattedType?: string;
}

interface Organization {
  metadata?: FieldMetadata;
  type?: string;
  readonly formattedType?: string;
  startDate?: DateContact;
  endDate?: DateContact;
  current?: boolean;
  name?: string;
  phoneticName?: string;
  department?: string;
  title?: string;
  jobDescription?: string;
  symbol?: string;
  domain?: string;
  location?: string;
}

interface Occupation {
  metadata?: FieldMetadata;
  value: string;
}

interface Interest {
  metadata?: FieldMetadata;
  value: string;
}

interface Skill {
  metadata?: FieldMetadata;
  value: string;
}

interface BraggingRights {
  metadata?: FieldMetadata;
  value: string;
}

interface Relation {
  metadata?: FieldMetadata;
  person: string;
  type: string; // spouse, child, mother, father, parent, brother, sister, friend, relative, domesticPartner, manager, assistant, referredBy, partner
  readonly formattedType?: string;
}

interface RelationshipInterest {
  metadata?: FieldMetadata;
  value: string;
  formattedValue?: string;
}

interface RelationshipStatus {
  metadata?: FieldMetadata;
  value: string;
  formattedValue?: string;
}

interface Membership {
  metadata?: FieldMetadata;

  // Union field membership can be only one of the following:
  contactGroupMembership: ContactGroupMembership;
  domainMembership: DomainMembership;
  // End of list of possible types for union field membership.
}

interface ContactGroupMembership {
  contactGroupId: string;
}

interface DomainMembership {
  inViewerDomain: boolean;
}

interface UserDefined {
  metadata?: FieldMetadata;
  key: string;
  value: string;
}

interface SipAddress {
  metadata?: FieldMetadata;
  value: string;
  type?: string;
  readonly formattedType?: string;
}

enum ContentType {
  CONTENT_TYPE_UNSPECIFIED,
  TEXT_PLAIN,
  TEXT_HTML
}
enum AgeRange {
  AGE_RANGE_UNSPECIFIED,
  LESS_THAN_EIGHTEEN,
  EIGHTEEN_TO_TWENTY,
  TWENTY_ONE_OR_OLDER
}
enum NicknameType {
  DEFAULT,
  MAIDEN_NAME,
  INITIALS,
  GPLUS,
  OTHER_NAME
}
enum SourceType {
  SOURCE_TYPE_UNSPECIFIED,
  ACCOUNT,
  PROFILE,
  DOMAIN_PROFILE,
  CONTACT
}
enum ObjectType {
  OBJECT_TYPE_UNSPECIFIED,
  PERSON,
  PAGE
}
enum UserType {
  USER_TYPE_UNKNOWN,
  GOOGLE_USER,
  GPLUS_USER,
  GOOGLE_APPS_USER
}
