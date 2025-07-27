import { IgdbConfig } from '@config/interfaces';
import { RequestAllConfig } from 'apicalypse';

import { InterceptorSubsystem } from './Subsystem';
import { IgdbResources } from './enum/IgdbResources';
import { ArtworkField, ExpandedArtworkField } from './enum/field/ArtworkField';
import { CompanyField, ExpandedCompanyField } from './enum/field/CompanyField';
import {
  DateFormatField,
  ExpandedDateFormatField,
} from './enum/field/DateFormatField';
import {
  ExpandedFranchiseField,
  FranchiseField,
} from './enum/field/FranchiseField';
import { ExpandedGameField, GameField } from './enum/field/GameField';
import {
  ExpandedGameModeField,
  GameModeField,
} from './enum/field/GameModeField';
import {
  ExpandedGameStatusField,
  GameStatusField,
} from './enum/field/GameStatusField';
import {
  ExpandedGameTypeField,
  GameTypeField,
} from './enum/field/GameTypeField';
import { ExpandedGenreField, GenreField } from './enum/field/GenreField';
import {
  ExpandedInvolvedComanyField,
  InvolvedComanyField,
} from './enum/field/InvolvedCompanyField';
import { ExpandedKeywordField, KeywordField } from './enum/field/KeywordField';
import {
  ExpandedMultiplayerModeField,
  MultiplayerModeField,
} from './enum/field/MultiplayerModeField';
import {
  ExpandedPlatformFamilyField,
  PlatformFamilyField,
} from './enum/field/PlatformFamilyField';
import {
  ExpandedPlatformField,
  PlatformField,
} from './enum/field/PlatformField';
import {
  ExpandedPlatformLogoField,
  PlatformLogoField,
} from './enum/field/PlatformLogoField';
import {
  ExpandedPlatformTypeField,
  PlatformTypeField,
} from './enum/field/PlatformTypeField';
import {
  ExpandedPlatformVersionCompanyField,
  PlatformVersionCompanyField,
} from './enum/field/PlatformVersionCompanyField';
import {
  ExpandedPlatformVersionField,
  PlatformVersionField,
} from './enum/field/PlatformVersionField';
import {
  ExpandedPlatformVersionReleaseDateField,
  PlatformVersionReleaseDateField,
} from './enum/field/PlatformVersionReleaseDateField';
import {
  ExpandedPlatformWebsiteField,
  PlatformWebsiteField,
} from './enum/field/PlatformWebsiteField';
import {
  ExpandedReleaseDateRegionField,
  ReleaseDateRegionField,
} from './enum/field/ReleaseDateRegionField';
import {
  ExpandedScreenshotField,
  ScreenshotField,
} from './enum/field/ScreenshotField';
import { ExpandedThemeField, ThemeField } from './enum/field/ThemeField';
import { ExpandedWebsiteField, WebsiteField } from './enum/field/WebsiteField';
import {
  ExpandedWebsiteTypeField,
  WebsiteTypeField,
} from './enum/field/WebsiteTypeField';
import { IGetAll } from './interfaces';
import { IgdbField } from './types';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAll extends InterceptorSubsystem implements IGetAll {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  fields: IgdbField | undefined = undefined;
  protected totalCount: number | undefined = undefined;
  constructor(igdbConfig: IgdbConfig) {
    super(igdbConfig);
  }

  public async execute<DTO>(
    options: RequestAllConfig,
    limit: number,
    resource: IgdbResources,
    expanded: boolean = true,
    totalResourceCount: number,
  ): Promise<DTO[]> {
    await this.prepare({ expanded, resource, totalResourceCount });
    if (this.fields) {
      const data = await this.client
        .limit(limit)
        .fields(this.fields)
        .requestAll(`/${resource}`, options);
      //   .request(`/${resource}`);
      // return data.data;
      return data;
    }
    return [];
  }

  public getFields(
    expanded: boolean,
    resource: IgdbResources,
  ): IgdbField | undefined {
    switch (resource) {
      case IgdbResources.GAMES:
        return Object.values(expanded ? ExpandedGameField : GameField);
      case IgdbResources.WEBSITES:
        return Object.values(expanded ? ExpandedWebsiteField : WebsiteField);
      case IgdbResources.ARTWORKS:
        return Object.values(expanded ? ExpandedArtworkField : ArtworkField);
      case IgdbResources.COMPANIES:
        return Object.values(expanded ? ExpandedCompanyField : CompanyField);
      case IgdbResources.COVERS:
        return Object.values(expanded ? ExpandedArtworkField : ArtworkField);
      case IgdbResources.INVOLVED_COMPANIES:
        return Object.values(
          expanded ? ExpandedInvolvedComanyField : InvolvedComanyField,
        );
      case IgdbResources.FRANCHISES:
        return Object.values(
          expanded ? ExpandedFranchiseField : FranchiseField,
        );
      case IgdbResources.PLATFORMS:
        return Object.values(expanded ? ExpandedPlatformField : PlatformField);
      case IgdbResources.PLATFORM_LOGOS:
        return Object.values(
          expanded ? ExpandedPlatformLogoField : PlatformLogoField,
        );
      case IgdbResources.PLATFORM_WEBSITES:
        return Object.values(
          expanded ? ExpandedPlatformWebsiteField : PlatformWebsiteField,
        );
      case IgdbResources.PLATFORM_FAMILIES:
        return Object.values(
          expanded ? ExpandedPlatformFamilyField : PlatformFamilyField,
        );
      case IgdbResources.PLATFORM_VERSION_COMPANIES:
        return Object.values(
          expanded
            ? ExpandedPlatformVersionCompanyField
            : PlatformVersionCompanyField,
        );
      case IgdbResources.PLATFORM_VERSIONS:
        return Object.values(
          expanded ? ExpandedPlatformVersionField : PlatformVersionField,
        );
      case IgdbResources.PLATFORM_VERSION_RELEASE_DATES:
        return Object.values(
          expanded
            ? ExpandedPlatformVersionReleaseDateField
            : PlatformVersionReleaseDateField,
        );
      case IgdbResources.GENRES:
        return Object.values(expanded ? ExpandedGenreField : GenreField);
      case IgdbResources.KEYWORDS:
        return Object.values(expanded ? ExpandedKeywordField : KeywordField);
      case IgdbResources.THEMES:
        return Object.values(expanded ? ExpandedThemeField : ThemeField);
      case IgdbResources.SCREENSHOTS:
        return Object.values(
          expanded ? ExpandedScreenshotField : ScreenshotField,
        );
      case IgdbResources.MULTIPLAYER_MODES:
        return Object.values(
          expanded ? ExpandedMultiplayerModeField : MultiplayerModeField,
        );
      case IgdbResources.GAME_MODES:
        return Object.values(expanded ? ExpandedGameModeField : GameModeField);
      case IgdbResources.DATE_FORMAT:
        return Object.values(
          expanded ? ExpandedDateFormatField : DateFormatField,
        );
      case IgdbResources.GAME_TYPE:
        return Object.values(expanded ? ExpandedGameTypeField : GameTypeField);
      case IgdbResources.GAME_STATUS:
        return Object.values(
          expanded ? ExpandedGameStatusField : GameStatusField,
        );
      case IgdbResources.PLATFORM_TYPES:
        return Object.values(
          expanded ? ExpandedPlatformTypeField : PlatformTypeField,
        );
      case IgdbResources.RELEASE_DATE_REGIONS:
        return Object.values(
          expanded ? ExpandedReleaseDateRegionField : ReleaseDateRegionField,
        );
      case IgdbResources.WEBSITE_TYPES:
        return Object.values(
          expanded ? ExpandedWebsiteTypeField : WebsiteTypeField,
        );
      default:
        return;
    }
  }

  public async prepare({
    expanded = true,
    resource,
    totalResourceCount,
  }): Promise<void> {
    this.totalCount = totalResourceCount ? totalResourceCount : undefined;
    this.fields = this.getFields(expanded, resource) ?? this.fields;
    if (this.fields && this.totalCount) {
      this.setInterceptorClient({
        count: this.totalCount,
        fields: this.fields,
        timeout: 120000,
      });
      return Promise.resolve();
    }
    throw new Error('Fields and totalCount must be defined.');
  }
}
