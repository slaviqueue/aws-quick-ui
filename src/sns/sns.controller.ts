import { Controller, Get, Render } from '@nestjs/common'
import { SnsService } from './sns.service'

@Controller('sns')
export class SnsController {
  public constructor(private readonly snsService: SnsService) {}

  @Get('topics')
  @Render('sns-topics')
  public async getTopics() {
    const { Topics } = await this.snsService.getTopics()

    return {
      topics: Topics,
    }
  }
}
