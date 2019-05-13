using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Newtonsoft.Json;
using Web.Infrastructure.Data;

namespace Web.Features.Home
{
    public class Index
    {
        public class Command : IRequest<Result>
        {
            public string Message { get; set; }
        }

        public class Result
        {
            public string Response { get; set; }
        }

        public class IndexHandler : IRequestHandler<Command, Result>
        {
            private readonly IMapper _mapper;
            private readonly ApplicationDbContext _ctx;
            public IndexHandler(IMapper mapper, ApplicationDbContext ctx)
            {
                _mapper = mapper;
                _ctx = ctx;
            }

            public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
            {
                var response = new Result() { Response = "Success" };

                return await Task.FromResult(response);
            }
        }

    }
}
