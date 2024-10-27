import { Test, TestingModule } from '@nestjs/testing'
import { SqsController } from './sqs.controller'

describe('SqsController', () => {
  let controller: SqsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqsController],
    }).compile()

    controller = module.get<SqsController>(SqsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
