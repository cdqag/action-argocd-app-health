import { describe, test, expect } from '@jest/globals';

import { EOL } from 'os'
import { JSONInterpreter } from '../JSONInterpreter';

let originalWriteFunction: (str: string) => boolean
let interpreter: JSONInterpreter;


beforeAll(() => {
  interpreter = new JSONInterpreter();
});


describe('doesMatch', () => {
  test('should not match line', () => {
    expect(interpreter.doesMatch('test')).toBe(false);
  });

  test('should match line', () => {
    expect(interpreter.doesMatch('{"hello":"there"}')).toBe(true);
  });
});


describe('annotate', () => {
  beforeAll(() => {
    originalWriteFunction = process.stdout.write
  })

  beforeEach(() => {
    process.stdout.write = jest.fn()
  })

  afterEach(() => {})

  afterAll(() => {
    process.stdout.write = originalWriteFunction as unknown as (
      str: string
    ) => boolean
  })

  test('should not annotate', () => {
    interpreter.annotate(
      `{"@timestamp":"2025-05-12T11:26:12.627613048Z","@version":"1","message":"Bootstrapping Spring Data MongoDB repositories in DEFAULT mode.","logger_name":"org.springframework.data.repository.config.RepositoryConfigurationDelegate","thread_name":"main","level":"INFO","level_value":20000,"dd.service":"example-api","dd.env":"staging","dd.version":"2.96.0","domain":"matching","component":"example-api"}`
    );
    
    expect(process.stdout.write).toHaveBeenCalledTimes(0);
  });

  test('should annotate warning line', () => {
    interpreter.annotate(
      `{"@timestamp":"2025-05-12T11:26:15.835863531Z","@version":"1","message":"Bean 'cdq.redis.exception.handler.ExceptionCacheConfiguration' of type [cdq.redis.exception.handler.ExceptionCacheConfiguration] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying). Is this bean getting eagerly injected into a currently created BeanPostProcessor [meterRegistryPostProcessor]? Check the corresponding BeanPostProcessor declaration and its dependencies.","logger_name":"org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker","thread_name":"main","level":"WARN","level_value":30000,"dd.service":"example-api","dd.env":"staging","dd.version":"2.96.0","domain":"matching","component":"example-api"}`
    );
    
    expect(process.stdout.write).toHaveBeenCalledWith(
      `::warning::Bean 'cdq.redis.exception.handler.ExceptionCacheConfiguration' of type [cdq.redis.exception.handler.ExceptionCacheConfiguration] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying). Is this bean getting eagerly injected into a currently created BeanPostProcessor [meterRegistryPostProcessor]? Check the corresponding BeanPostProcessor declaration and its dependencies.${EOL}`
    )
  });

  test('should annotate error line', () => {
    interpreter.annotate(
      `{"@timestamp":"2025-05-12T15:05:55.126184125Z","@version":"1","message":"Identity links creation failed, duplicated key","logger_name":"cdq.cdl.matching.identitylink.service.UserFeedbackService","thread_name":"http-nio-8080-exec-8","level":"ERROR","level_value":40000,"stack_trace":"Bulk write operation error on server cdqservices-shard-00-02.g7glp.mongodb.net:27017. Write errors:\\n\\tat java.lang.Thread.run(Unknown Source)\\n","x_credential_username":"8d20118a-2065-4b03-a3b9-11274034aaea","x_b3_spanid":"a1f5ba12585cabf4","x_request_id":"1c1e84fc-d333-b19f-87ba-62be7706436a","x_b3_sampled":"1","x_b3_traceid":"72969c1a1aa924006bb5ee7fef0b2477","x_b3_parentspanid":"d0669897245ea48f","dd.trace_id":"c507f491000000003181c94a7e2e1b6f","dd.service":"example-api","dd.env":"staging","dd.version":"2.96.0","dd.span_id":"6950527792267718781","domain":"matching","component":"example-api"}`
    );
    
    expect(process.stdout.write).toHaveBeenCalledWith(
      `::error::Identity links creation failed, duplicated key%0A%0AStack trace:%0ABulk write operation error on server cdqservices-shard-00-02.g7glp.mongodb.net:27017. Write errors:%0A\tat java.lang.Thread.run(Unknown Source)${EOL}`
    )
  });
});
