import { Injectable, NotFoundException } from '@nestjs/common';
import { OfficeService } from '../OfficeService.interface';
import { Office } from '../../../decorators/Office.decorator';
import {
  TeamMember,
  Office as OfficeLocation
} from '../../team-member/TeamMember';

export const hammerSquadKey = 'hammer-squad';
export const hammerSquadValue: TeamMember[] = [
  {
    name: 'Brian',
    office: OfficeLocation.HAM,
    favouriteColour: 'brown',
    id: 'bfh',
    playsPingpong: null
  }
];

interface RawHammerSquad {
  id: string;
  employee: string;
  weight: number;
  wellFormed: boolean;
  favourites: {
    color: string;
  };
}

export const rawHammerSquadValue: RawHammerSquad[] = [
  {
    id: 'bfh',
    employee: 'Brian',
    weight: 100,
    wellFormed: false,
    favourites: {
      color: 'brown'
    }
  }
];

@Office(hammerSquadKey)
@Injectable()
export class HammerSquadOfficeService implements OfficeService {
  private fetchVehikls() {
    return rawHammerSquadValue;
  }

  private mapToExpected(data: RawHammerSquad): TeamMember {
    return {
      id: data.id,
      name: `${data.employee}`,
      office: OfficeLocation.HAM,
      favouriteColour: data.favourites.color,
      playsPingpong: null
    };
  }

  public getVehikls() {
    const raw = this.fetchVehikls();

    return raw.map(this.mapToExpected);
  }
  public async getTeamMember(id: string) {
    const member = rawHammerSquadValue.find(member => member.id === id);

    if (!member) {
      throw new NotFoundException(
        `Member by id ${id} not found in Hammer Squad`
      );
    }

    return this.mapToExpected(member);
  }
}
